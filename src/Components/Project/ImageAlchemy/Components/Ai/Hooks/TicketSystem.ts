import { useState, useEffect } from "react";

const useTicketSystem = (initialTickets: number = 3) => {
  // Load tickets from localStorage immediately
  const storedTickets = localStorage.getItem("tickets");
  const [tickets, setTickets] = useState<number>(
    storedTickets ? parseInt(storedTickets, 10) : initialTickets
  );
  const [isCounting, setIsCounting] = useState<boolean>(false);

  // Save tickets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tickets", tickets.toString());
  }, [tickets]);

  // Function to use a ticket
  const useTicket = () => {
    if (tickets > 0) {
      setTickets((prev) => {
        if (prev === 1) {
          startCountdown();
        }
        return prev - 1;
      });
      return true;
    }
    return false;
  };

  // Function to start a countdown and regenerate tickets if less than 3
  useEffect(() => {
    if (tickets < 3 && !isCounting) {
      startCountdown();
    }
  }, [tickets]);

  const startCountdown = () => {
    if (isCounting || tickets >= 3) return; // Prevent duplicate timers
    setIsCounting(true);
    
    const timer = setInterval(() => {
      setTickets((prev) => {
        if (prev < 3) {
          return prev + 1;
        } else {
          clearInterval(timer); // Stop when reaching 3
          setIsCounting(false);
          return prev;
        }
      });
    }, 5 * 60 * 1000); // 5 minutes per ticket
  };

  // Function to buy more tickets
  const buyTickets = (amount: number) => {
    setTickets((prev) => prev + amount);
  };

  return { tickets, isCounting, useTicket, buyTickets };
};

export default useTicketSystem;
